export class OrderDetailDto {
    constructor(
        public productId: number,
        public orderId: number,
        public quantity: number,
        public price: number,
        public categoryName: string,
        public productName: string
    ) {
    }
}