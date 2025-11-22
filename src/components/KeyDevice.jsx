import React, { useState } from "react";

// funcao principal do componente KeyDevice
function KeyDevice() {
  //as variaveis de estado necessarias
  const [baseUrl, setBaseUrl] = useState(""); // URl da APi iniciando vazia
  const [keyValue, setKeyValue] = useState(""); // valor da chave iniciando vazia

  const [loading, setLoading] = useState(false); // estado de carregamento
  const [error, setError] = useState(null); // estado de erro
  const [data, setData] = useState(null); // estado dos dados retornados

  //funcao para buscar os dados da API

  async function handleFetch() {
    //funcao assincrona que chama a API
    setError(null); // reseta o erro
    setData(null); // reseta os dados

    // valida se a URL base e a chave foram fornecidas
    if (!baseUrl || !keyValue) {
      // se um dos dois estiver vazio
      setError("Digite a URL base e a chave."); // retorna o erro
      return; // sai da funcao
    }

    const finalUrl = `${baseUrl}/${keyValue}`; // constroi a URL final colocando a barra entre os dois pra que o usuário digite apenas a URL

    // um try catch para tratar erros na requisicao
    try {
      setLoading(true); // inicia o carregamento

      const res = await fetch(finalUrl); // faz a requisicao para a URL final

      // verifica se a resposta e valida

      if (!res.ok) {
        // se a resposta nao for ok
        throw new Error(`Chave ou URL nao encontrada. Status: ${res.status}`);
      }

      const json = await res.json(); // converte a resposta para JSON
      setData(json);
    } catch (err) {
      setError(err.message || "Erro ao buscar dados.");
    } finally {
      setLoading(false);
    }
  }

  // aqui começa o retorno do componente

  return (
    <div style={{ padding: 20, maxWidth: 600 }}>
      <h2>Buscar chave na API</h2>

      {/* Campo da URL */}

      <div style={{ marginBottom: 10 }}>
        <label>URL da API:</label>
        <input
          type="text"
          placeholder="https://vixplay.altersoft.dev.br/api/public/device"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 4 }}
        />
      </div>

      {/* Campo da chave */}
      <div style={{ marginBottom: 10 }}>
        <label>Chave:</label>
        <input
          type="text"
          placeholder="3A9D3D"
          value={keyValue}
          onChange={(e) => setKeyValue(e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 4 }}
        />
      </div>

      {/* Botão enviar */}

      <button
        // chama a funcao handleFetch ao clicar

        onClick={handleFetch}
        style={{ padding: "10px 20px", marginTop: 10 }}
      >
        Pesquisar
      </button>

      {/* mostra o texto de carregamento se loading for true */}
      {loading && <p style={{ marginTop: 20 }}>Carregando...</p>}

      {/* mostra o erro se houver */}
      {error && <p style={{ marginTop: 20, color: "red" }}>{error}</p>}

      {/* mostra os dados retornados se houver */}
      {data && (
        <div
          style={{
            marginTop: 20,
            background: "#000000ff",
            padding: 15,
            borderRadius: 8,
            whiteSpace: "pre-wrap",
          }}
        >
          {/* Null significa que nao quremos parametros e 2 é a identacao */}
          {JSON.stringify(data, null, 2)} 
        
          <br />
       
          
        </div>
      )}
    </div>
  );
}
export default KeyDevice;
