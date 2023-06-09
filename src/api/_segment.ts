import { request } from "../utils/request";

export abstract class SegmentAPI<T extends { name: string; id?: number }> {
    private readonly uri: string;
    constructor(private readonly host: string, private readonly name: string) {
        this.uri = `${this.host}/${this.name}`;
    }

    async list({
       limit,
       offset,
   } = { limit: 10, offset: 0 }) {
        const { results } = await request<{
            results: Pick<T, 'name' | 'id'>[];
        }>(`${this.uri}?limit=${limit}&offset=${offset}`);

        return results;
    };

    async getOne({ name, id }: Partial<Pick<T, 'name' | 'id'>>) {
        return await request<T>(`${this.uri}/${id || name}`);
    }
}
