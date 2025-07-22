"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPaymentMethodsUseCase = void 0;
class GetPaymentMethodsUseCase {
    paymentMethodRepository;
    constructor(paymentMethodRepository) {
        this.paymentMethodRepository = paymentMethodRepository;
    }
    async execute() {
        return this.paymentMethodRepository.findEnabled();
    }
    async executeByIds(ids) {
        const paymentMethods = await this.paymentMethodRepository.findByIds(ids);
        return paymentMethods.filter(pm => pm.enabled).sort((a, b) => a.priority - b.priority);
    }
    async executeByCategory(category) {
        return this.paymentMethodRepository.findByCategory(category);
    }
}
exports.GetPaymentMethodsUseCase = GetPaymentMethodsUseCase;
