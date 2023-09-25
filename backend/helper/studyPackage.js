exports.PRICE = {
    FEE: 50e3
};

exports.PACKAGES = {
    INDEPENDENT: 'independent',
    SUBSCRIBE: 'subscribe'
};

exports.AMOUNT_MEETING = {
    PACKET_1: {
        AMOUNT: 4,
        MAX_CHOOSE_DAY: 1,
        FEE: this.PRICE.FEE * 4 - (0.1 * (this.PRICE.FEE * 4))
    },
    PACKET_2: {
        AMOUNT: 8,
        MAX_CHOOSE_DAY: 2,
        FEE: this.PRICE.FEE * 8 - (0.1 * (this.PRICE.FEE * 8))
    },
    PACKET_3: {
        AMOUNT: 12,
        MAX_CHOOSE_DAY: 3,
        FEE: this.PRICE.FEE * 12 - (0.1 * (this.PRICE.FEE * 12))
    },
    PACKET_4: {
        AMOUNT: 16,
        MAX_CHOOSE_DAY: 4,
        FEE: this.PRICE.FEE * 16 - (0.2 * (this.PRICE.FEE * 16))
    },
}

exports.MIDTRANS = {
    FEE: 4e3,
};