/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Hume from "../../../../../../index";

/**
 * @example
 *     {}
 */
export interface BatchListJobsRequest {
    /**
     * The maximum number of jobs to include in the response.
     */
    limit?: number;
    /**
     * Include only jobs of this status in the response. There are four possible statuses:
     *
     * - `QUEUED`: The job has been received and is waiting to be processed.
     *
     * - `IN_PROGRESS`: The job is currently being processed.
     *
     * - `COMPLETED`: The job has finished processing.
     *
     * - `FAILED`: The job encountered an error and could not be completed successfully.
     */
    status?: Hume.expressionMeasurement.Status | Hume.expressionMeasurement.Status[];
    /**
     * Specify whether to include jobs created before or after a given `timestamp_ms`.
     */
    when?: Hume.expressionMeasurement.When;
    /**
     * Provide a timestamp in milliseconds to filter jobs.
     *
     * When combined with the `when` parameter, you can filter jobs before or after the given timestamp. Defaults to the current Unix timestamp if one is not provided.
     */
    timestampMs?: number;
    /**
     * Specify which timestamp to sort the jobs by.
     *
     * - `created`: Sort jobs by the time of creation, indicated by `created_timestamp_ms`.
     *
     * - `started`: Sort jobs by the time processing started, indicated by `started_timestamp_ms`.
     *
     * - `ended`: Sort jobs by the time processing ended, indicated by `ended_timestamp_ms`.
     */
    sortBy?: Hume.expressionMeasurement.SortBy;
    /**
     * Specify the order in which to sort the jobs. Defaults to descending order.
     *
     * - `asc`: Sort in ascending order (chronological, with the oldest records first).
     *
     * - `desc`: Sort in descending order (reverse-chronological, with the newest records first).
     */
    direction?: Hume.expressionMeasurement.Direction;
}
