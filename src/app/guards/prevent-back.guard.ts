import { CanDeactivateFn } from '@angular/router';

export const preventBackGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return false;
};
