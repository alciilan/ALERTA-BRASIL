import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const noticiasIniciais = [
  { titulo: "Bem-vindo ao Portal Brasil!", conteudo: "Sua fonte de notícias confiável." }
];

const Home = ({ noticias }) => (
  <div className="p-4 grid gap-4">
    <h1 className="text-3xl font-bold text-green-700">Notícias</h1>
    {noticias.map((n, i) => (
      <Card key={i} className="bg-yellow-100">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold text-blue-700">{n.titulo}</h2>
          <p className="text-green-900">{n.conteudo}</p>
        </CardContent>
      </Card>
    ))}
  </div>
);

const Login = ({ onLogin }) => {
  const [senha, setSenha] = useState("");
  const login = () => senha === "admin" && onLogin();
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-green-700 mb-2">Login Administrador</h1>
      <Input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
      <Button className="mt-2 bg-green-600 text-white" onClick={login}>Entrar</Button>
    </div>
  );
};

const Admin = ({ noticias, setNoticias }) => {
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const publicar = () => {
    setNoticias([...noticias, { titulo, conteudo }]);
    setTitulo("");
    setConteudo("");
  };
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-700 mb-2">Publicar Notícia</h1>
      <Input placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} />
      <Textarea placeholder="Conteúdo" className="mt-2" value={conteudo} onChange={e => setConteudo(e.target.value)} />
      <Button className="mt-2 bg-yellow-500 text-green-900" onClick={publicar}>Publicar</Button>
    </div>
  );
};

const AlterarSenha = ({ setSenhaAdmin }) => {
  const [novaSenha, setNovaSenha] = useState("");
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-green-700 mb-2">Alterar Senha</h1>
      <Input type="password" placeholder="Nova Senha" value={novaSenha} onChange={e => setNovaSenha(e.target.value)} />
      <Button className="mt-2 bg-blue-600 text-white" onClick={() => setSenhaAdmin(novaSenha)}>Salvar</Button>
    </div>
  );
};

export default function App() {
  const [logado, setLogado] = useState(false);
  const [senhaAdmin, setSenhaAdmin] = useState("admin");
  const [noticias, setNoticias] = useState(noticiasIniciais);

  return (
    <Router>
      <nav className="p-4 bg-green-600 text-white flex gap-4">
        <Link to="/">Início</Link>
        <Link to="/login">Login</Link>
        {logado && <><Link to="/admin">Admin</Link><Link to="/senha">Alterar Senha</Link></>}
      </nav>
      <Routes>
        <Route path="/" element={<Home noticias={noticias} />} />
        <Route path="/login" element={<Login onLogin={() => setLogado(true)} />} />
        <Route path="/admin" element={logado ? <Admin noticias={noticias} setNoticias={setNoticias} /> : <Navigate to="/login" />} />
        <Route path="/senha" element={logado ? <AlterarSenha setSenhaAdmin={setSenhaAdmin} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}