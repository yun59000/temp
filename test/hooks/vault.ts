
import * as fs from 'node:fs';
// import { get } from 'node:http';
// import { Interface } from 'node:readline';



export interface Root {
  request_id: string
  lease_id: string
  renewable: boolean
  lease_duration: number
  data: Data
  wrap_info: any
  warnings: any
  auth: any
}

export interface Data {
  data: DataData
  metadata: Metadata
}

export interface DataData {
  id: string
  pwd: string
}

export interface Metadata {
  created_time: string
  custom_metadata: any
  deletion_time: string
  destroyed: boolean
  version: number
}

//a adapter pour recuperer le token surtout sur une CI
const getToken = () => {
    let token = process.env.VAULT_TOKEN;
    if ("VAULT_TOKEN" in process.env) {
        console.log('token from jenkins');
    } else {
        let pathToken = "C:\\Users\\" + process.env.username + "\\.vault-token";
        token = fs.readFileSync(pathToken, { encoding: 'utf8', flag: 'r' })
    }
    return token;
}



export const getJson = async ():Promise<DataData> => {
  const token = getToken();
  const response =  await fetch('https://vault.agilefabric.fr/v1/kv-qod/data/ARIANE', {
      headers: { Authorization: 'Bearer ' + token }
  })
 

  let jsonData: Root = await response.json()
  return  jsonData.data.data
}











