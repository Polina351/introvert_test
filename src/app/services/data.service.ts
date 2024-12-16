import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  salesState = signal([
    { key: 'notProcessed', label: 'Неразобрано', checked: false },
    { key: 'negotiations', label: 'Переговоры', checked: false },
    { key: 'decisionPending', label: 'Принимают решение', checked: false },
    { key: 'successful', label: 'Успешно', checked: false },
  ]);

  employeesState = signal([
    { key: 'notProcessed', label: 'Неразобрано', checked: false },
    { key: 'negotiations', label: 'Переговоры', checked: false },
    { key: 'decisionPending', label: 'Принимают решение', checked: false },
    { key: 'successful', label: 'Успешно', checked: false },
  ]);

  partnersState = signal([
    { key: 'notProcessed', label: 'Неразобрано', checked: false },
    { key: 'negotiations', label: 'Переговоры', checked: false },
    { key: 'decisionPending', label: 'Принимают решение', checked: false },
    { key: 'successful', label: 'Успешно', checked: false },
  ]);

  eventState = signal([
    { key: 'notProcessed', label: 'Неразобрано', checked: false },
    { key: 'negotiations', label: 'Переговоры', checked: true },
    { key: 'decisionPending', label: 'Принимают решение', checked: false },
    { key: 'successful', label: 'Успешно', checked: false },
  ]);

  incomingRequestsState = signal([
    { key: 'notProcessed', label: 'Неразобрано', checked: false },
    { key: 'negotiations', label: 'Переговоры', checked: false },
    { key: 'decisionPending', label: 'Принимают решение', checked: false },
    { key: 'successful', label: 'Успешно', checked: false },
  ]);

  updateCheckboxState(list: string, key: string, value: boolean) {
    // @ts-ignore
    const state  = this[list];

    if (state) {
      const currentState = state();
      const checkBox = currentState.find((item: any) => item.key === key);
      if (checkBox) {
        checkBox.checked = value;
        state.set([...currentState]);
      }
    }
    console.log(state());
  }
}
