export interface NewSaleDTO{
        artworkId:string;
        price:number;
        artistRevenueShare: number;
        creatorRevenue: number;
        dateOfSale: Date|string|number;
        notes: string
}