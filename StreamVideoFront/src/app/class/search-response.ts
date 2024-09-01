//Clase para recibir repuesta del SearchById
export class SearchResponse {
    result: {
      product: string;
      purchased: boolean;
      saved: boolean;
    };
  
    constructor(result: { product: string; purchased: boolean; saved: boolean }) {
      this.result = result;
    }
}