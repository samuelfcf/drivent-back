import Activity from "../entities/Activity";

interface Certificate {
    name: string;
    cpf: string;
    type: number;
    activities: Activity[];
}

export default Certificate;
