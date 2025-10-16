import { google } from "googleapis";
import env from "#config/env/env.js";
import knex from "#postgres/knex.js";

interface DataForSheet {
    geoName: string;
    warehouseName: string;
    boxStorageBase: string;
    boxStorageCoefExpr: number;
    boxStorageLiter: string;
    boxDeliveryBase: string;
    boxDeliveryCoefExpr: string;
    boxDeliveryLiter: string;
    boxDeliveryMarketplaceBase: string;
    boxDeliveryMarketplaceCoefExpr: string;
    boxDeliveryMarketplaceLiter: string;
}

interface WarehouseList {
    geoName: string;
    warehouseName: string;
    boxStorageBase: string;
    boxStorageCoefExpr: string;
    boxStorageLiter: string;
    boxDeliveryBase: string;
    boxDeliveryCoefExpr: string;
    boxDeliveryLiter: string;
    boxDeliveryMarketplaceBase: string;
    boxDeliveryMarketplaceCoefExpr: string;
    boxDeliveryMarketplaceLiter: string;
}

interface SelectDB extends WarehouseList {
    id: number,
    date: string,
}

interface ResponseWB {
    response: {
        data: { 
            dtNextBox: string,
            dtTillMax: string,
            warehouseList: WarehouseList[],
        },
    },
}

async function saveData(data: string[][]): Promise<void> {
    const auth = new google.auth.GoogleAuth({
        keyFile: "./dist/config/credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const spreadsheetIds = env.SPREADSHEETIDS;
    const client: any = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });

    for (const spreadsheetId of spreadsheetIds) {
        await googleSheets.spreadsheets.values.clear({
            auth,
            spreadsheetId,
            range: "stocks_coefs!A2:L2",
            },
        );

        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "stocks_coefs!A2:L2",
            valueInputOption: "USER_ENTERED",
            requestBody: {
            values: data,
            },
        });
    }
}

async function loadData(): Promise<void> {
    const pathApi: string = "https://common-api.wildberries.ru/api/v1/tariffs/box";
    const date: Date = new Date();
    const current_date: string = date.toISOString().slice(0,10);
    const params: string = `date=${current_date}`;
    
    await fetch(pathApi + "?" + params, {
        method: "GET",
        headers: {
            "Authorization": env.API_KEY,
        },
        signal: AbortSignal.timeout(5000),
    }).then(async (response: Response) => {
        const response_rezult: ResponseWB = await response.json();

        if (response_rezult.response.data.warehouseList.length) {
            for(const list of response_rezult.response.data.warehouseList) {
                const list_wb: DataForSheet = createWarehouseList(list);
                
                await knex<SelectDB>("WB").where({ warehouseName: list_wb.warehouseName, date: current_date }).select().then(async (result_select) => {
                    if (result_select.length) {
                        await knex<SelectDB>("WB").where({ id: result_select[0].id }).update({ ...<any>list_wb, date: current_date });
                    } else {
                        await knex<SelectDB>("WB").insert({ ...<any>list_wb, date: current_date });
                    }
                });
            }
            const select_res = await knex<SelectDB>("WB").where({ date: current_date }).orderBy("boxStorageCoefExpr", "ask").select();
            let saveDataSheets = createSaveData(select_res, current_date);
            await saveData(saveDataSheets);
        }

        console.log(`${date.toISOString()} UPDATE_DATA_OK`);
    }).catch(async (err) => {
        sleep(5);
        await loadData();
    });
}

function createSaveData(select_res: SelectDB[], current_date: string): string[][] {
    let saveDataSheets: string[][] = [];
    
    for (const res of select_res) {
        let saveDataSheet: string[] = [
            res.geoName,
            res.warehouseName,
            res.boxStorageBase,
            (parseInt(res.boxStorageCoefExpr) == 10000) ? "-" : res.boxStorageCoefExpr,
            res.boxStorageLiter,
            res.boxDeliveryBase,
            res.boxDeliveryCoefExpr,
            res.boxDeliveryLiter,
            res.boxDeliveryMarketplaceBase,
            res.boxDeliveryMarketplaceCoefExpr,
            res.boxDeliveryMarketplaceLiter,
        ];
        saveDataSheet.unshift(current_date);
        saveDataSheets.push(saveDataSheet);
    }

    return saveDataSheets;
};

function createWarehouseList(list: WarehouseList): DataForSheet {
    const list_wb: DataForSheet = {
        geoName: list.geoName,
        warehouseName: list.warehouseName,
        boxStorageBase: list.boxStorageBase,
        boxStorageCoefExpr: Number.isInteger(parseInt(list.boxStorageCoefExpr)) ? parseInt(list.boxStorageCoefExpr) : 10000,
        boxStorageLiter: list.boxStorageLiter,
        boxDeliveryBase: list.boxDeliveryBase,
        boxDeliveryCoefExpr: list.boxDeliveryCoefExpr,
        boxDeliveryLiter: list.boxDeliveryLiter,
        boxDeliveryMarketplaceBase: list.boxDeliveryMarketplaceBase,
        boxDeliveryMarketplaceCoefExpr: list.boxDeliveryMarketplaceCoefExpr,
        boxDeliveryMarketplaceLiter: list.boxDeliveryMarketplaceLiter,
    };
    return list_wb;
}

function sleep(cek: number) {
    var t = (new Date()).getTime();
    var i = 0;
    while (((new Date()).getTime() - t) < cek * 1000) {
        i++;
    }
}

export async function startWB() {
    for (;;) {
        await loadData();
        sleep(60 * 60);
    }
}
