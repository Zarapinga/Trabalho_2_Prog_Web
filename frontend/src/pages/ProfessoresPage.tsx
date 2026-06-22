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
import { professoresApi, departamentosApi } from '../api/endpoints';
import type { Professor, Departamento } from '../types/models';
import { indexById } from '../utils/format';

export default function ProfessoresPage() {
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    departamentosApi.list().then(setDepartamentos).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const handle = setTimeout(() => {
      professoresApi
        .list(search)
        .then((data) => {
          setProfessores(data);
          setError(null);
        })
        .catch(() => setError('Erro ao carregar professores. O backend está rodando?'))
        .finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(handle);
  }, [search]);

  const deptMap = useMemo(() => indexById(departamentos), [departamentos]);

  // Filtro client-side por departamento.
  const filtered = useMemo(
    () =>
      deptFilter
        ? professores.filter((p) => String(p.departamento) === deptFilter)
        : professores,
    [professores, deptFilter],
  );

  const deptOptions = useMemo(
    () => departamentos.map((d) => ({ value: String(d.id), label: d.nome })),
    [departamentos],
  );

  return (
    <Box>
      <PageHeader title="Professores" />

      <FilterBar
        onClear={() => {
          setSearch('');
          setDeptFilter('');
        }}
        showClear={!!search || !!deptFilter}
      >
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Buscar por nome"
        />
        <FilterSelect
          label="Departamento"
          value={deptFilter}
          onChange={setDeptFilter}
          options={deptOptions}
          minWidth={220}
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
                <TableCell>Departamento</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id} hover>
                  <TableCell>{p.nome}</TableCell>
                  <TableCell>{deptMap.get(p.departamento)?.nome ?? '—'}</TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    Nenhum professor encontrado.
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
