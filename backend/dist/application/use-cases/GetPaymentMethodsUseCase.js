"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPaymentMethodsUseCase = void 0;
class GetPaymentMethodsUseCase {
    paymentMethodRepository;
    constructor(paymentMethodRepository) {
        this.paymentMethodRepository = paymentMethodRepository;
    }
    async execute() {
        return this.paymentMethodRepository.findAll();
    }
    async executeByIds(ids) {
        return this.paymentMethodRepository.findByIds(ids);
    }
}
exports.GetPaymentMethodsUseCase = GetPaymentMethodsUseCase;
