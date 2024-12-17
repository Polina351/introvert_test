import {computed, Injectable, signal} from '@angular/core';
import {IndexDbService} from './index-db.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private indexedDB: IndexDbService) {
    this.initializeStates();
  }

  salesState = signal([
    {key: 'notProcessed', label: 'Неразобрано', checked: false},
    {key: 'negotiations', label: 'Переговоры', checked: false},
    {key: 'decisionPending', label: 'Принимают решение', checked: false},
    {key: 'successful', label: 'Успешно', checked: false},
  ]);

  employeesState = signal([
    {key: 'notProcessed', label: 'Неразобрано', checked: false},
    {key: 'negotiations', label: 'Переговоры', checked: false},
    {key: 'decisionPending', label: 'Принимают решение', checked: false},
    {key: 'successful', label: 'Успешно', checked: false},
  ]);

  partnersState = signal([
    {key: 'notProcessed', label: 'Неразобрано', checked: false},
    {key: 'negotiations', label: 'Переговоры', checked: false},
    {key: 'decisionPending', label: 'Принимают решение', checked: false},
    {key: 'successful', label: 'Успешно', checked: false},
  ]);

  eventState = signal([
    {key: 'notProcessed', label: 'Неразобрано', checked: false},
    {key: 'negotiations', label: 'Переговоры', checked: true},
    {key: 'decisionPending', label: 'Принимают решение', checked: false},
    {key: 'successful', label: 'Успешно', checked: false},
  ]);

  incomingRequestsState = signal([
    {key: 'notProcessed', label: 'Неразобрано', checked: false},
    {key: 'negotiations', label: 'Переговоры', checked: false},
    {key: 'decisionPending', label: 'Принимают решение', checked: false},
    {key: 'successful', label: 'Успешно', checked: false},
  ]);

  funnelsState = signal([
    {key: 'salesState', label: 'Продажи', state: this.salesState, isOpen: false},
    {key: 'employeesState', label: 'Сотрудники', state: this.employeesState, isOpen: false},
    {key: 'partnersState', label: 'Партнеры', state: this.partnersState, isOpen: false},
    {key: 'eventState', label: 'Ивенты', state: this.eventState, isOpen: false},
    {key: 'incomingRequestsState', label: 'Входящие обращения', state: this.incomingRequestsState, isOpen: false}
  ])

  isMenuOpen = signal(false);

  private allStates = computed(() => [
    this.salesState(),
    this.employeesState(),
    this.partnersState(),
    this.eventState(),
    this.incomingRequestsState()
  ]);

  funnelsCount = computed(() =>
    this.allStates().filter((state) =>
      state.some((checkbox) => checkbox.checked)
    ).length
  );

  stagesCount = computed(() =>
    this.allStates().reduce((acc, state) =>
      acc + state.filter((checkbox) => checkbox.checked).length, 0)
  );

  private stateKeys = ['salesState', 'employeesState', 'partnersState', 'eventState', 'incomingRequestsState'];

  private async initializeStates() {
    for (const key of this.stateKeys) {
      const savedData = await this.indexedDB.loadData(key);
      if (savedData) {
        // @ts-ignore
        this[key].set(savedData);
      }
    }
  }

  saveStates() {
    this.indexedDB.saveData('salesState', this.salesState());
    this.indexedDB.saveData('employeesState', this.employeesState());
    this.indexedDB.saveData('partnersState', this.partnersState());
    this.indexedDB.saveData('eventState', this.eventState());
    this.indexedDB.saveData('incomingRequestsState', this.incomingRequestsState());
  }

  /**
   * Универсальная функция для склонения слов
   * @param count number
   * @param words string[]
   */
  getPluralForm(count: number, words: [string, string, string]): string {
    const cases = [2, 0, 1, 1, 1, 2];
    const index =
      count % 100 > 4 && count % 100 < 20
        ? 2
        : cases[Math.min(count % 10, 5)];
    return `${count} ${words[index]}`;
  }

  updateCheckboxState(list: string, key: string, value: boolean) {
    // @ts-ignore
    const state = this[list];

    if (state) {
      const currentState = state();
      const checkBox = currentState.find((item: any) => item.key === key);
      if (checkBox) {
        checkBox.checked = value;
        state.set([...currentState]);
        this.saveStates();
      }
    }
  }

  isAllUnchecked() {
    return this.allStates().every((state) =>
      state.every((checkbox) => !checkbox.checked)
    );
  }

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  selectAll() {
    this.allStates().forEach((state) => {
      state.forEach((checkbox) => (checkbox.checked = true));
    });
    this.updateSignals();
    this.saveStates();
  }

  deselectAll() {
    this.allStates().forEach((state) => {
      state.forEach((checkbox) => (checkbox.checked = false));
    });
    this.updateSignals();
    this.saveStates();
  }

  private updateSignals() {
    this.salesState.set([...this.salesState()]);
    this.employeesState.set([...this.employeesState()]);
    this.partnersState.set([...this.partnersState()]);
    this.eventState.set([...this.eventState()]);
    this.incomingRequestsState.set([...this.incomingRequestsState()]);
  }
}
