class Calculadora {
    constructor(anteriorOperandoTexto, atualOperandoTexto) {
        this.anteriorOperandoTexto = anteriorOperandoTexto;
        this.atualOperandoTexto = atualOperandoTexto;
        this.clear();
    }

    clear() {
        this.atualOperando = '';
        this.anteriorOperando = '';
        this.operacao = undefined;
    }

    delete() {
        this.atualOperando = this.atualOperando.toString().slice(0, -1);
    }

    colocarNumero(numero) {
        if(numero != '.' || !this.atualOperando.includes('.')) {
            this.atualOperando = this.atualOperando.toString() + numero.toString();
        } 
    }

    escolherOperacao(operacao) {
        if(!this.atualOperando == '') {
            if(this.anteriorOperando != '') {
                this.calcular();
            }
            this.operacao = operacao;
            this.anteriorOperando = this.atualOperando;
            this.atualOperando = ''; 
        }
    }

    calcular() {
        let calculo;
        const anterior = parseFloat(this.anteriorOperando);
        const atual = parseFloat(this.atualOperando);

        if(!isNaN(anterior) && !isNaN(atual)) {
            switch (this.operacao) {
                case '+':
                    calculo = anterior + atual;
                    break;
                case '-':
                    calculo = anterior - atual;
                    break;
                case '*':
                    calculo = anterior * atual;
                    break;
                case '÷':
                    calculo = anterior / atual;
                    break;
                case 'xy':
                    calculo = anterior ** atual;
                    break;
                default:
                    return;
            }

            this.atualOperando = calculo;
            this.operacao = undefined;
            this.anteriorOperando = '';
        }
    }

    numeroDisplay(numero) {
        const stringNumber = numero.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;

        if(isNaN(integerDigits)) {
            integerDisplay = '';
        }
        else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        }
        else {
            return integerDisplay;
        }
    }

    atualizarDisplay() {
        this.atualOperandoTexto.innerText = this.numeroDisplay(this.atualOperando);
        if(this.operacao != null && this.operacao != 'xy') {
            this.anteriorOperandoTexto.innerText = `${this.numeroDisplay(this.anteriorOperando)} ${this.operacao}`
        }
        else if(this.operacao == 'xy') {
            this.anteriorOperandoTexto.innerText = `${this.numeroDisplay(this.anteriorOperando)} ^`
        }
        else {
            this.anteriorOperandoTexto.innerText = '';
        }
    }
}


const numeroBtns = document.querySelectorAll('.numero');
const operacaoBtns = document.querySelectorAll('.operacao');
const resultadoBtn = document.querySelector('.resultado');
const deleteBtn = document.querySelector('.delete');
const clearBtn = document.querySelector('.clear');
const anteriorOperandoTexto = document.querySelector('.operando-anterior');
const atualOperandoTexto = document.querySelector('.operando-atual');

const calculadora = new Calculadora(anteriorOperandoTexto, atualOperandoTexto);

numeroBtns.forEach(botao => {
    botao.addEventListener('click', () => {
        calculadora.colocarNumero(botao.innerText);
        calculadora.atualizarDisplay();
    })
})

operacaoBtns.forEach(botao => {
    botao.addEventListener('click', () => {
        calculadora.escolherOperacao(botao.innerText);
        calculadora.atualizarDisplay();
    })
})

resultadoBtn.addEventListener('click', botao => {
    calculadora.calcular();
    calculadora.atualizarDisplay();
})

clearBtn.addEventListener('click', botao => {
    calculadora.clear();
    calculadora.atualizarDisplay();
})

deleteBtn.addEventListener('click', botao => {
    calculadora.delete();
    calculadora.atualizarDisplay();
})