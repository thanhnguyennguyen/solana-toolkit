import { inspectMessage } from './index'



test('test solana inspector', async() => {
    const data = 'AT1ZvyfXQuIzxqDI9Ti2Xk43VSALNCGue23ydxOI6FcnwQjsA01XesXawzxB15G5712phiBOoIFWLsJSN4qm9AIBAAUTSJcO25cy9OeEpj+94deD5NA7x3WNaQpL8Zi3z2fjB8U9bkcuZ6RuprS9C6ud/TXitMcvHW1Zwuq5XJQlc60i8fQRtdRejGa7LPcbb0X1rADKVzfxp2IFx3sK/viF6uXHq+Q8fB4h6qb5fIvTVeIb0SeWdHVsHI4QbG5xK6EW2XC4cOEt03mJFWHS6fqPJkMYNOtzby8k/CoqTf8f1dyk3/LLubdg7dsYVwYwMGOtM9e1cpbqAtTgM14xzq+kzELdhML7GK7WGfVGYyZT7wYCnwKoZL84KYZxgbsg3x1xXDAA9CbhbrjPAxGRdfmAUUNElVzjcOdllA88KUOVRftFqabf0VxQdwX5M5uVPBpN/bycwYbdL2LfSKlYBF4qdlJZQCCJRlPP3fp7fmDJZmgnNqLbD4OFZJJbEQd6IeA215cfJvXwRhxAEL1cyMpwZt2lhKbucXk0xnet9MJfvRVqLWrj7TJ6D4hJp3KUHZcFDzpujLjdOrzbFHCIfIK1TT825rHPBhwWEZoOWhgWY+D3rGr9mDepIH0T8KyaYNEBC+1tTk1At+gQ7KuVFw4RSjjjGaamQrR0vOQuJmdoVvx6BAbd9uHXZaGT2cvhRs7reawctIXtX1s3kTqM9YV+/wCpQVewWA8xxfzkSmJYLbz5147nWUOghKOTs1A2jSKJkwiFDy1uAqR6+CTQmradxC1wyyjL+iSft+5XudJWwSdi79Hvc09oIE6y4sBGKXlKjAIQetCb87IZWXoU7/uKBNmGS9lJxDYCwz8gd5DtFqNSTKG5l1zxIaKpDP/sffi2is3SwL8tWupsn4stRq45i5H1DXc9Du08PavEWa14G+1oCAESEg4BDwIDBAUQBgcICQoLEQwNABEJ6AMAAAAAAAAvAAAAAAAAAA=='
    const output = await inspectMessage(data)
    expect(output?.parsed?.accountList[0]?.address).toBe('5tMx9GXT5jg3hiM9sZ7i341hQH2bqN45Q7FNEKG6Xixk')
    expect(output?.parsed?.accountList[6]?.address).toBe('9wFFyRfZBsuAha4YcuxcXLKwMxJR43S7fPfQLusDBzvT')
    expect(output?.parsed?.accountList[6]?.name).toBe('Serum Market SOL/USDC')
    expect(output?.parsed?.instructions[0]?.program.name).toBe('Raydium Liquidity Pool V4')
    expect(output?.parsed?.instructions[0]?.program.address).toBe('675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8')
    expect(output?.parsed?.instructions[0]?.data.raw).toBe('6QA8xgGjPVLmdfBCkQ5QagF')
    expect(output?.parsed?.instructions[0]?.data.hex).toBe('e9003cc601a33d52e675f042910e506a01')
});