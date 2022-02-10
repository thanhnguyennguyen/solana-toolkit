#!/usr/bin/env node
const { prettyProgramLogs, inspectMessage } = require('../dist/tsc/main')

const main = async() => {
    let pLog = await prettyProgramLogs([
        'Program 11111111111111111111111111111111 invoke [1]',
        'Program 11111111111111111111111111111111 success',
        'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [1]',
        'Program log: Instruction: InitializeAccount',
        'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 3392 of 200000 compute units',
        'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success',
        'Program 675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8 invoke [1]',
        'Program log: swap_base_in amount_in:8100000000, minimum_amount_out:906894983',
        'Program log: max_bid_price:Some(113347), min_ask_price:Some(113506)',
        'Program log: swap_base_in total_pc:44216203657379, total_coin:389985580796223',
        'Program log: swap_base_in swap_in_after_deduct_fee:8079750000, swap_amount_out:916055586',
        'Program log: swap_base_in cancel buy:Order { price: 113038, order_id: 2085201503348053962090791, slot: 0 }',
        'Program 9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin invoke [2]',
        'Program 9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin consumed 4188 of 135185 compute units',
        'Program 9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin success',
        'Program log: swap_base_in coin to pc, out_coin:8100000000, out_pc:916055586',
        'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]',
        'Program log: Instruction: Transfer',
        'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 2755 of 126463 compute units',
        'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success',
        'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]',
        'Program log: Instruction: Transfer',
        'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 2643 of 120191 compute units',
        'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success',
        'Program 675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8 consumed 83977 of 200000 compute units',
        'Program 675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8 success',
        'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [1]',
        'Program log: Instruction: TransferChecked',
        'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 3285 of 200000 compute units',
        'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success',
        'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [1]',
        'Program log: Instruction: CloseAccount',
        'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1713 of 200000 compute units',
        'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success'
], null)
    let decodedMessage = await inspectMessage("AT1ZvyfXQuIzxqDI9Ti2Xk43VSALNCGue23ydxOI6FcnwQjsA01XesXawzxB15G5712phiBOoIFWLsJSN4qm9AIBAAUTSJcO25cy9OeEpj+94deD5NA7x3WNaQpL8Zi3z2fjB8U9bkcuZ6RuprS9C6ud/TXitMcvHW1Zwuq5XJQlc60i8fQRtdRejGa7LPcbb0X1rADKVzfxp2IFx3sK/viF6uXHq+Q8fB4h6qb5fIvTVeIb0SeWdHVsHI4QbG5xK6EW2XC4cOEt03mJFWHS6fqPJkMYNOtzby8k/CoqTf8f1dyk3/LLubdg7dsYVwYwMGOtM9e1cpbqAtTgM14xzq+kzELdhML7GK7WGfVGYyZT7wYCnwKoZL84KYZxgbsg3x1xXDAA9CbhbrjPAxGRdfmAUUNElVzjcOdllA88KUOVRftFqabf0VxQdwX5M5uVPBpN/bycwYbdL2LfSKlYBF4qdlJZQCCJRlPP3fp7fmDJZmgnNqLbD4OFZJJbEQd6IeA215cfJvXwRhxAEL1cyMpwZt2lhKbucXk0xnet9MJfvRVqLWrj7TJ6D4hJp3KUHZcFDzpujLjdOrzbFHCIfIK1TT825rHPBhwWEZoOWhgWY+D3rGr9mDepIH0T8KyaYNEBC+1tTk1At+gQ7KuVFw4RSjjjGaamQrR0vOQuJmdoVvx6BAbd9uHXZaGT2cvhRs7reawctIXtX1s3kTqM9YV+/wCpQVewWA8xxfzkSmJYLbz5147nWUOghKOTs1A2jSKJkwiFDy1uAqR6+CTQmradxC1wyyjL+iSft+5XudJWwSdi79Hvc09oIE6y4sBGKXlKjAIQetCb87IZWXoU7/uKBNmGS9lJxDYCwz8gd5DtFqNSTKG5l1zxIaKpDP/sffi2is3SwL8tWupsn4stRq45i5H1DXc9Du08PavEWa14G+1oCAESEg4BDwIDBAUQBgcICQoLEQwNABEJ6AMAAAAAAAAvAAAAAAAAAA==")
    console.log(JSON.stringify(decodedMessage))
}
main()
