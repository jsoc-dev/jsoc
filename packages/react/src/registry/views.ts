import { JsocGrid } from '../views/grid/JsocGrid';
import { JsocForm } from '../views/form/JsocForm';

export type View = Extract<
    keyof (typeof VIEW_REGISTRY),
    string
>;

export const VIEW_REGISTRY = {
    grid: JsocGrid,
    form: JsocForm,
} as const;