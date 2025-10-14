/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
    return knex.schema.createTable("WB", (table) => {
        table.increments("id").primary();
        table.string("geoName", 255);
        table.string("warehouseName", 255);
        table.string("boxDeliveryBase", 11);
        table.string("boxDeliveryCoefExpr", 11);
        table.string("boxDeliveryLiter", 11);
        table.string("boxDeliveryMarketplaceBase", 11);
        table.string("boxDeliveryMarketplaceCoefExpr", 11);
        table.string("boxDeliveryMarketplaceLiter", 11);
        table.string("boxStorageBase", 11);
        table.integer("boxStorageCoefExpr");
        table.string("boxStorageLiter", 11);
        table.string("date", 11);
    });
}

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function down(knex) {
    return knex.schema.dropTable("WB");
}
