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
import { cursosApi } from '../api/endpoints';
import type { Curso } from '../types/models';
import { filterByText } from '../utils/format';

export default function CursosPage() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    cursosApi
      .list()
      .then((data) => {
        setCursos(data);
        setError(null);
      })
      .catch(() => setError('Erro ao carregar cursos. O backend está rodando?'))
      .finally(() => setLoading(false));
  }, []);

  // Busca client-side: o backend não expõe ?search= para cursos.
  const filtered = useMemo(
    () => filterByText(cursos, search, ['nome', 'sigla', 'codigo']),
    [cursos, search],
  );

  return (
    <Box>
      <PageHeader title="Cursos" />

      <FilterBar onClear={() => setSearch('')} showClear={!!search}>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Buscar por nome, sigla ou código"
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
                <TableCell>Sigla</TableCell>
                <TableCell>Código</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id} hover>
                  <TableCell>{c.nome}</TableCell>
                  <TableCell>{c.sigla}</TableCell>
                  <TableCell>{c.codigo}</TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    Nenhum curso encontrado.
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
