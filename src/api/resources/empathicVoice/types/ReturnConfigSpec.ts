/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * The Config associated with this Chat.
 */
export interface ReturnConfigSpec {
    /** Identifier for a Config. Formatted as a UUID. */
    id: string;
    /**
     * Version number for a Config.
     *
     * Configs, as well as Prompts and Tools, are versioned. This versioning system supports iterative development, allowing you to progressively refine configurations and revert to previous versions if needed.
     *
     * Version numbers are integer values representing different iterations of the Config. Each update to the Config increments its version number.
     */
    version?: number;
}
