let p_segundos = 0;
let p_minutos = 0;
let p_horas = 0;
let i_contarSegundos;

let controleTipoTempo = 0;
let progresso = 0;

btnConfig.onclick = () => {
    overlay.classList.add("active");
    modalConfig.classList.add("active");
};

btnFecharConfig.onclick = () => {
    overlay.classList.remove("active");
    modalConfig.classList.remove("active");
};

overlay.onclick = () => {
    overlay.classList.remove("active");
    modalConfig.classList.remove("active");
};

pomodoroTime.onkeyup = () => {
    setarTempo(pomodoroTime.value);
    pt.innerHTML = "P: " +  pomodoroTime.value + "s";
};

pomodoroTime.onclick = () => {
    setarTempo(pomodoroTime.value);
    pt.innerHTML = "P: " +  pomodoroTime.value + "s";
};

shortPauseTime.onkeyup = () => {
    st.innerHTML = "P: " +  shortPauseTime.value + "s";
};

shortPauseTime.onclick = () => {
    st.innerHTML = "P: " +  shortPauseTime.value + "s";
};

longPauseTime.onkeyup = () => {
    lt.innerHTML = "P: " +  longPauseTime.value + "s";
};

longPauseTime.onclick = () => {
    lt.innerHTML = "P: " +  longPauseTime.value + "s";
};

acao.onclick = () => {
    switch (acao.getAttribute("estado")) {
        case "i":
            if (controleTipoTempo < 4) {
                acao.setAttribute("estado", "p");
                acao.innerHTML = "PARAR";
                controleTipoTempo++;
                iniciarIntervalo();
            }            
            break;
        case "p":
            acao.setAttribute("estado", "c");
            acao.innerHTML = "CONTINUAR";
            titulo.classList.add("vermelho");
            pararIntervalo();
            break;
        case "c":
            acao.setAttribute("estado", "p");
            acao.innerHTML = "PARAR";
            titulo.classList.remove("vermelho");
            iniciarIntervalo();            
            break;
    }
};

function iniciarIntervalo() {
    i_contarSegundos = setInterval(() => {
        contarSegundos();
    }, 1000);
}

function pararIntervalo() {
    clearInterval(i_contarSegundos);
}

function setarTempo(tempo) {
    if (tempo) {
        if (tempo <= 59) {
            hora.innerHTML = "00";
            minuto.innerHTML = "00";
            
            p_segundos = tempo;            
            segundo.innerHTML = p_segundos < 10 ? "0" + p_segundos : p_segundos;
        }
        else if (tempo / 60 <= 59) {
            hora.innerHTML = "00";

            p_minutos = parseInt((tempo / 60));
            minuto.innerHTML = p_minutos < 10 ? "0" + p_minutos : p_minutos;

            p_segundos = tempo - (p_minutos * 60); 
            segundo.innerHTML = p_segundos < 10 ? "0" + p_segundos : p_segundos;
        }
        else {

            p_horas = parseInt((tempo / 3600));
            hora.innerHTML = p_horas < 10 ? "0" + p_horas : p_horas;

            tempo = tempo - (p_horas * 3600);

            p_minutos = parseInt((tempo / 60));
            minuto.innerHTML = p_minutos < 10 ? "0" + p_minutos : p_minutos;

            p_segundos = tempo - (p_minutos * 60); 
            segundo.innerHTML = p_segundos < 10 ? "0" + p_segundos : p_segundos;

        }

        progresso = (p_horas * 3600) + (p_minutos * 60) + p_segundos;

    } else {
        limparTudo()
    }
}

function contarSegundos() {
        
    if (p_horas == 0){
        if (p_minutos == 0) {
            if (p_segundos == 0) {
                segundo.innerHTML = "00";
                pararIntervalo();
                acao.setAttribute("estado", "i");
                acao.innerHTML = "INICIAR";
                if (controleTipoTempo == 1) {
                    barraProgresso.style.width = "0%";
                    setarTempo(shortPauseTime.value);
                    titulo.innerHTML = "Short Pause Time";
                }
                else if (controleTipoTempo == 2) { 
                    barraProgresso.style.width = "0%";
                    setarTempo(pomodoroTime.value);
                    titulo.innerHTML = "Pomodoro Time";
                }
                else if (controleTipoTempo == 3) {
                    barraProgresso.style.width = "0%";
                    setarTempo(longPauseTime.value);
                    titulo.innerHTML = "Long Pause Time";
                }                              
                else if (controleTipoTempo == 4) {
                    titulo.innerHTML = "Pomodoro Time";
                    limparTudo();
                }                                
                return;
            }
        } else {
            if (p_segundos == 0) {
                p_segundos = 59;
                p_minutos--;
                minuto.innerHTML = p_minutos < 10 ? "0" + p_minutos : p_minutos;
                segundo.innerHTML = "59";
                return;
            }
        }
    } else {
        if (p_minutos == 0) {
            p_minutos = 59;
            p_horas--;
            hora.innerHTML = p_horas < 10 ? "0" + p_horas : p_horas;
            minuto.innerHTML = "59";
            return;
        }
        if (p_segundos == 0) {
            p_segundos = 59;
            p_minutos--;
            minuto.innerHTML = p_minutos < 10 ? "0" + p_minutos : p_minutos;
            segundo.innerHTML = "59";
            return;
        }
    }
    p_segundos--;
    segundo.innerHTML = p_segundos < 10 ? "0" + p_segundos : p_segundos;
    barraProgresso.style.width = 100 - (((p_horas * 3600) + (p_minutos * 60) + p_segundos) / progresso * 100) + "%";
}

function limparTudo() {
    p_horas = 0;
    p_minutos = 0;
    p_segundos = 0;
    hora.innerHTML = "00";
    minuto.innerHTML = "00";
    segundo.innerHTML = "00";
    pt.innerHTML = "P: 0s";
    st.innerHTML = "P: 0s";
    lt.innerHTML = "P: 0s";
    pomodoroTime.value = "";
    shortPauseTime.value = "";
    longPauseTime.value = "";
    controleTipoTempo = 0;
    barraProgresso.style.width = "0%";
}
