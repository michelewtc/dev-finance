const Modal = {
    open() {
        document.querySelector('.modal-overlay').classList.add('active')
    },
    close() {
        document.querySelector('.modal-overlay').classList.remove('active')
    }
}

const transaction = [
    {
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '23/01/2021',
    },
    {
        id: 2,
        description: 'Website',
        amount: 500000,
        date: '23/01/2021',
    },
    {
        id: 3,
        description: 'Internet',
        amount: -20000,
        date: '23/01/2021',
    },
    {
        id: 4,
        description: 'Create App',
        amount: 200000,
        date: '23/01/2021',
    },
]

const Transaction = {
    all: transaction,

    add(transaction) {
        Transaction.all.push(transaction)

        App.reload()
    },

    incomes() {
        let income = 0;
        //pega todas as transacoes 
        //para cada transacao 
        Transaction.all.forEach(transaction => {
            //se ela for maior que zero 
            if ( transaction.amount > 0 ) {
                //soma a uma e retorna
                income += transaction.amount;
            }
        })
        return income;
    },

    expenses() {
        let expense = 0;
        //pega todas as transacoes 
        //para cada transacao 
        Transaction.all.forEach(transaction => {
            //se ela for menor que zero 
            if ( transaction.amount < 0 ) {
                //soma a uma e retorna
                expense += transaction.amount;
            }
        })
        return expense;
    },

    total() {
        return Transaction.incomes() + Transaction.expenses();
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },    
    
    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
        <tr>
            <td class="date">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="Remover transação">
            </td>
        </tr>
        `

        return html
    }, 

    updateBalance() {
        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes())
        document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses())
        document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions() {
        
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""
        
        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
    }
}

const App = {
    init() {

    Transaction.all.forEach(transaction => {
        DOM.addTransaction(transaction)
    })

    DOM.updateBalance()

    },
    
    reload() {
        App.init()
    }
}

App.init()

Transaction.add({
    id: 10,
    description: 'aa',
    amount: 100,
    date: '23/01/2021'
})