/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";
import { DatasetVersion } from "./DatasetVersion";
import { PageableObject } from "./PageableObject";
import { SortObject } from "./SortObject";

export const DatasetVersionPage: core.serialization.ObjectSchema<
    serializers.customModels.DatasetVersionPage.Raw,
    Hume.customModels.DatasetVersionPage
> = core.serialization.object({
    content: core.serialization.list(DatasetVersion).optional(),
    pageable: PageableObject.optional(),
    total: core.serialization.number().optional(),
    last: core.serialization.boolean().optional(),
    totalElements: core.serialization.property("total_elements", core.serialization.number().optional()),
    totalPages: core.serialization.property("total_pages", core.serialization.number().optional()),
    size: core.serialization.number().optional(),
    number: core.serialization.number().optional(),
    sort: SortObject.optional(),
    first: core.serialization.boolean().optional(),
    numberOfElements: core.serialization.property("number_of_elements", core.serialization.number().optional()),
    empty: core.serialization.boolean().optional(),
});

export declare namespace DatasetVersionPage {
    interface Raw {
        content?: DatasetVersion.Raw[] | null;
        pageable?: PageableObject.Raw | null;
        total?: number | null;
        last?: boolean | null;
        total_elements?: number | null;
        total_pages?: number | null;
        size?: number | null;
        number?: number | null;
        sort?: SortObject.Raw | null;
        first?: boolean | null;
        number_of_elements?: number | null;
        empty?: boolean | null;
    }
}
