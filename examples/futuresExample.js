const Binance = require('../node-binance-api.js');
const binance = new Binance().options({
	test: true,
	APIKEY: 'aad3fb974a7f5d896d7e1a5c483d49324191bd82340a0ba5187f949d8cf19e14',
	APISECRET: '70664a1ab137f3cba9409ccc64d175f43dadd3313af100565e08be9147768b12'
});

async function placeOrder() {
	let order = await binance.futuresOrder('BUY', 'BTCUSDT', 0.01, 30000, { positionSide: 'LONG' });
	console.log('PLACE ORDER:', order);
}

async function placeOrders() {
	let order = await binance.futuresBatchOrders({
		batchOrders: [
			{ side: 'BUY', symbol: 'BTCUSDT', type: 'LIMIT', quantity: '0.001', price: '30000', timeInForce: 'GTC', positionSide: 'LONG' },
			{ side: 'BUY', symbol: 'BTCUSDT', type: 'LIMIT', quantity: '0.001', price: '30001', timeInForce: 'GTC', positionSide: 'LONG' },
			{ side: 'BUY', symbol: 'BTCUSDT', type: 'LIMIT', quantity: '0.001', price: '30002', timeInForce: 'GTC', positionSide: 'LONG' },
			{ side: 'BUY', symbol: 'BTCUSDT', type: 'LIMIT', quantity: '0.001', price: '30003', timeInForce: 'GTC', positionSide: 'LONG' },
			{ side: 'BUY', symbol: 'BTCUSDT', type: 'LIMIT', quantity: '0.001', price: '30004', timeInForce: 'GTC', positionSide: 'LONG' },
		]
	});
	console.log('PLACE ORDERS:', order);
}

async function openOrders() {
	let orders = await binance.futuresOpenOrders()
	console.log('OPEN ORDERS:', orders)
}

async function cancelOpenOrders() {
	let orders = await binance.futuresOpenOrders()
	let orderIds = orders.map(e => e.orderId)
	console.log(orderIds)
	console.log(await binance.futuresCancelBatch({ symbol: 'BTCUSDT', orderIdList: orderIds }))
}

async function main() {
	await placeOrders();
}

main().catch(err => console.error(err))


