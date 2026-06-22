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
import { unidadesApi } from '../api/endpoints';
import type { UnidadeAcademica } from '../types/models';
import { filterByText } from '../utils/format';

export default function UnidadesPage() {
  const [unidades, setUnidades] = useState<UnidadeAcademica[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    unidadesApi
      .list()
      .then((data) => {
        setUnidades(data);
        setError(null);
      })
      .catch(() => setError('Erro ao carregar unidades. O backend está rodando?'))
      .finally(() => setLoading(false));
  }, []);

  // Busca client-side: o backend não expõe ?search= para unidades.
  const filtered = useMemo(
    () => filterByText(unidades, search, ['nome', 'sigla']),
    [unidades, search],
  );

  return (
    <Box>
      <PageHeader title="Unidades Acadêmicas" />

      <FilterBar onClear={() => setSearch('')} showClear={!!search}>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Buscar por nome ou sigla"
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
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((u) => (
                <TableRow key={u.id} hover>
                  <TableCell>{u.nome}</TableCell>
                  <TableCell>{u.sigla}</TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    Nenhuma unidade encontrada.
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
