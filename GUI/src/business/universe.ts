import axios, {AxiosResponse} from 'axios';
import { format } from "util";
import { IUniverse } from "../types/universe";

export class UniverseService {

    /**
     * Load all universe available
     * @returns all universes available
     */
    public static loadAll() {
        return new Promise<IUniverse[]>((resolve, reject) => {
            axios.get("http://localhost:7000/universe").then((resp: AxiosResponse) => {
                resolve(resp.data as IUniverse[]);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    /**
     * Load universe from its id
     * @returns universe infos
     */
     public static load(universeId: string) {
        return new Promise<IUniverse>((resolve, reject) => {
            const url = format("http://localhost:7000/universe/%s", universeId);
            axios.get(url).then((resp: AxiosResponse) => {
                resolve(resp.data as IUniverse);
            }).catch((err) => {
                reject(err);
            });
        });
    }
}