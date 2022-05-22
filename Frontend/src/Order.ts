export class OrderDto {
    constructor(
        public orderId: number,
        public orderDate: string,
        public employeeName: string,
        public shippedDate: string,
        public freight: number,
        public shipName: string
    ) {
    }
}