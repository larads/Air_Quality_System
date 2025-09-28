# Sistema de Monitoramento de Qualidade do Ar

Um sistema IoT completo para monitoramento em tempo real da qualidade do ar, desenvolvido com React + TypeScript e integração com ESP32 e sensor BME680.

<img width="1919" height="998" alt="image" src="https://github.com/user-attachments/assets/04d0ed4c-830b-4bb4-977e-d175d4f4d9f5" />

## Dados Monitorados

- **🌡️ Temperatura**: Monitoramento em °C
- **💧 Umidade**: Medição em percentual (%)
- **🔽 Pressão Barométrica**: Leitura em hPa
- **🌫️ Qualidade do Ar**: Detecção de COV (Compostos Orgânicos Voláteis) em kΩ
  
## Tecnologias Utilizadas

### Frontend
- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Recharts** - Gráficos interativos
- **Lucide React** - Ícones
- **Vite** - Build tool

### Hardware IoT
- **ESP32** - Microcontrolador principal
- **BME680** - Sensor ambiental (temperatura, umidade, pressão, COV)
- **Protocolo I2C/SPI** - Comunicação com sensor
- **WiFi** - Conectividade para transmissão de dados

## Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- npm

### Instalação
```bash
# Clone o repositório
git clone https://github.com/larads/Air_Quality_System.git

# Entre no diretório
cd Air_Quality_System

# Instale as dependências
npm install
```

## Autora

**Mariana Lara** - [@larads](https://github.com/larads)
