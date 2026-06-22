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
import { departamentosApi, unidadesApi } from '../api/endpoints';
import type { Departamento, UnidadeAcademica } from '../types/models';
import { filterByText, indexById } from '../utils/format';

export default function DepartamentosPage() {
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [unidades, setUnidades] = useState<UnidadeAcademica[]>([]);
  const [search, setSearch] = useState('');
  const [unidadeFilter, setUnidadeFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    unidadesApi.list().then(setUnidades).catch(() => {});
    departamentosApi
      .list()
      .then((data) => {
        setDepartamentos(data);
        setError(null);
      })
      .catch(() => setError('Erro ao carregar departamentos. O backend está rodando?'))
      .finally(() => setLoading(false));
  }, []);

  const unidadesMap = useMemo(() => indexById(unidades), [unidades]);

  // Busca client-side (texto) + filtro client-side por unidade acadêmica.
  const filtered = useMemo(() => {
    let result = filterByText(departamentos, search, ['nome', 'sigla']);
    if (unidadeFilter) {
      result = result.filter(
        (d) => String(d.unidade_academica) === unidadeFilter,
      );
    }
    return result;
  }, [departamentos, search, unidadeFilter]);

  const unidadeOptions = useMemo(
    () => unidades.map((u) => ({ value: String(u.id), label: u.nome })),
    [unidades],
  );

  return (
    <Box>
      <PageHeader title="Departamentos" />

      <FilterBar
        onClear={() => {
          setSearch('');
          setUnidadeFilter('');
        }}
        showClear={!!search || !!unidadeFilter}
      >
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Buscar por nome ou sigla"
        />
        <FilterSelect
          label="Unidade Acadêmica"
          value={unidadeFilter}
          onChange={setUnidadeFilter}
          options={unidadeOptions}
          minWidth={240}
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
                <TableCell>Unidade Acadêmica</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((d) => (
                <TableRow key={d.id} hover>
                  <TableCell>{d.nome}</TableCell>
                  <TableCell>{d.sigla}</TableCell>
                  <TableCell>
                    {unidadesMap.get(d.unidade_academica)?.nome ?? '—'}
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    Nenhum departamento encontrado.
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
