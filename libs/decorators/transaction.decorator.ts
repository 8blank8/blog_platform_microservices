import { DataSource, EntityManager } from "typeorm"

export class TransactionDecorator {
    constructor(
        private dataSource: DataSource
    ) { }

    async doOperation<D, R>(
        data: D,
        operation: (data: D, manager: EntityManager) => R
    ) {
        const transaction = this.dataSource.createQueryRunner()
        await transaction.connect()
        await transaction.startTransaction()

        try {
            const res = await operation(data, transaction.manager)
            console.log({ transactionRes: res })
            if (!res) {
                await transaction.rollbackTransaction()
                console.log('rollback tranaction')
            } else {
                console.log('commit transaction')
                await transaction.commitTransaction()
            }
            return res
        } catch (err) {
            console.log('rollback transaction')
            await transaction.rollbackTransaction()
        } finally {
            console.log('realese')
            await transaction.release()
        }
    }
}