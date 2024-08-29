import { CanDeactivateFn } from '@angular/router';

export const noBackGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return true;
};
