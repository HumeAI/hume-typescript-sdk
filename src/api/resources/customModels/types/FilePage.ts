/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Hume from "../../../index";

export interface FilePage {
    content?: Hume.customModels.FileWithAttributes[];
    pageable?: Hume.customModels.PageableObject;
    total?: number;
    last?: boolean;
    totalElements?: number;
    totalPages?: number;
    size?: number;
    number?: number;
    sort?: Hume.customModels.SortObject;
    first?: boolean;
    numberOfElements?: number;
    empty?: boolean;
}
