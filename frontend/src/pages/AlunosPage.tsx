import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import PageHeader from '../components/PageHeader';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import FilterSelect from '../components/FilterSelect';
import { alunosApi, cursosApi } from '../api/endpoints';
import type { Aluno, Curso } from '../types/models';
import { indexById } from '../utils/format';

export default function AlunosPage() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [search, setSearch] = useState('');
  const [cursoFilter, setCursoFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cursos são carregados uma vez para resolver a FK -> nome e popular o filtro.
  useEffect(() => {
    cursosApi.list().then(setCursos).catch(() => {});
  }, []);

  // Busca server-side (?search=) com debounce simples.
  useEffect(() => {
    setLoading(true);
    const handle = setTimeout(() => {
      alunosApi
        .list(search)
        .then((data) => {
          setAlunos(data);
          setError(null);
        })
        .catch(() => setError('Erro ao carregar alunos. O backend está rodando?'))
        .finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(handle);
  }, [search]);

  const cursosMap = useMemo(() => indexById(cursos), [cursos]);

  // Filtro client-side por curso.
  const filtered = useMemo(
    () =>
      cursoFilter
        ? alunos.filter((a) => String(a.curso) === cursoFilter)
        : alunos,
    [alunos, cursoFilter],
  );

  const cursoOptions = useMemo(
    () => cursos.map((c) => ({ value: String(c.id), label: c.nome })),
    [cursos],
  );

  return (
    <Box>
      <PageHeader title="Alunos" />

      <FilterBar
        onClear={() => {
          setSearch('');
          setCursoFilter('');
        }}
        showClear={!!search || !!cursoFilter}
      >
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Buscar por nome ou matrícula"
        />
        <FilterSelect
          label="Curso"
          value={cursoFilter}
          onChange={setCursoFilter}
          options={cursoOptions}
        />
      </FilterBar>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Matrícula</TableCell>
                <TableCell>Curso</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((a) => (
                <TableRow key={a.id} hover>
                  <TableCell>{a.nome}</TableCell>
                  <TableCell>{a.matricula}</TableCell>
                  <TableCell>{cursosMap.get(a.curso)?.nome ?? '—'}</TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    Nenhum aluno encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
