import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Link,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/PictureAsPdf';
import PageHeader from '../components/PageHeader';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import FilterSelect from '../components/FilterSelect';
import ConfirmDialog from '../components/ConfirmDialog';
import { alunosApi, cursosApi, professoresApi, tccsApi } from '../api/endpoints';
import { mediaUrl } from '../api/client';
import type { Aluno, Curso, Professor, TCC, TccStatus } from '../types/models';
import {
  IDIOMA_OPTIONS,
  SEMESTRE_OPTIONS,
  STATUS_OPTIONS,
  TIPO_OPTIONS,
} from '../types/models';
import { indexById } from '../utils/format';

// Cor do chip por status, para leitura rápida na tabela.
const STATUS_COLOR: Record<TccStatus, 'default' | 'info' | 'success' | 'error'> = {
  '0': 'default',
  '1': 'info',
  '2': 'success',
  '3': 'error',
};

export default function TccListPage() {
  const navigate = useNavigate();
  const [tccs, setTccs] = useState<TCC[]>([]);
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<TCC | null>(null);

  // Filtros client-side.
  const [statusFilter, setStatusFilter] = useState('');
  const [tipoFilter, setTipoFilter] = useState('');
  const [idiomaFilter, setIdiomaFilter] = useState('');
  const [semestreFilter, setSemestreFilter] = useState('');
  const [orientadorFilter, setOrientadorFilter] = useState('');
  const [cursoFilter, setCursoFilter] = useState('');

  // Listas de apoio para resolver as FKs (aluno, orientador, curso) em nomes
  // e popular os dropdowns de filtro.
  useEffect(() => {
    alunosApi.list().then(setAlunos).catch(() => {});
    professoresApi.list().then(setProfessores).catch(() => {});
    cursosApi.list().then(setCursos).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const handle = setTimeout(() => {
      tccsApi
        .list(search)
        .then((data) => {
          setTccs(data);
          setError(null);
        })
        .catch(() => setError('Erro ao carregar TCCs. O backend está rodando?'))
        .finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(handle);
  }, [search]);

  const alunosMap = useMemo(() => indexById(alunos), [alunos]);
  const profMap = useMemo(() => indexById(professores), [professores]);

  // Aplica os filtros client-side sobre os TCCs já buscados.
  const filtered = useMemo(() => {
    return tccs.filter((t) => {
      if (statusFilter && t.status !== statusFilter) return false;
      if (tipoFilter && t.tipo !== tipoFilter) return false;
      if (idiomaFilter && t.idioma !== idiomaFilter) return false;
      if (semestreFilter && t.semestre_letivo_defesa !== semestreFilter) return false;
      if (orientadorFilter && String(t.orientador) !== orientadorFilter) return false;
      if (cursoFilter) {
        // Curso é resolvido pelo aluno do TCC (aluno -> curso).
        const cursoDoAluno = alunosMap.get(t.aluno)?.curso;
        if (String(cursoDoAluno) !== cursoFilter) return false;
      }
      return true;
    });
  }, [
    tccs,
    statusFilter,
    tipoFilter,
    idiomaFilter,
    semestreFilter,
    orientadorFilter,
    cursoFilter,
    alunosMap,
  ]);

  const hasFilters =
    !!search ||
    !!statusFilter ||
    !!tipoFilter ||
    !!idiomaFilter ||
    !!semestreFilter ||
    !!orientadorFilter ||
    !!cursoFilter;

  function clearFilters() {
    setSearch('');
    setStatusFilter('');
    setTipoFilter('');
    setIdiomaFilter('');
    setSemestreFilter('');
    setOrientadorFilter('');
    setCursoFilter('');
  }

  const orientadorOptions = useMemo(
    () => professores.map((p) => ({ value: String(p.id), label: p.nome })),
    [professores],
  );
  const cursoOptions = useMemo(
    () => cursos.map((c) => ({ value: String(c.id), label: c.nome })),
    [cursos],
  );

  async function handleStatusChange(tcc: TCC, status: TccStatus) {
    // Atualização otimista do status pela própria listagem.
    const previous = tcc.status;
    setTccs((cur) =>
      cur.map((t) => (t.id === tcc.id ? { ...t, status } : t)),
    );
    try {
      const updated = await tccsApi.patchStatus(tcc.id, status);
      setTccs((cur) => cur.map((t) => (t.id === tcc.id ? updated : t)));
    } catch {
      setTccs((cur) =>
        cur.map((t) => (t.id === tcc.id ? { ...t, status: previous } : t)),
      );
      setError('Não foi possível atualizar o status.');
    }
  }

  async function handleDelete() {
    if (!toDelete) return;
    try {
      await tccsApi.remove(toDelete.id);
      setTccs((cur) => cur.filter((t) => t.id !== toDelete.id));
    } catch {
      setError('Não foi possível excluir o TCC.');
    } finally {
      setToDelete(null);
    }
  }

  return (
    <Box>
      <PageHeader
        title="TCCs"
        action={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/tccs/novo')}
          >
            Novo TCC
          </Button>
        }
      />

      <FilterBar onClear={clearFilters} showClear={hasFilters}>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Buscar por título ou resumo"
        />
        <FilterSelect
          label="Status"
          value={statusFilter}
          onChange={setStatusFilter}
          options={STATUS_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          minWidth={160}
        />
        <FilterSelect
          label="Tipo"
          value={tipoFilter}
          onChange={setTipoFilter}
          options={TIPO_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          minWidth={180}
        />
        <FilterSelect
          label="Idioma"
          value={idiomaFilter}
          onChange={setIdiomaFilter}
          options={IDIOMA_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          minWidth={140}
        />
        <FilterSelect
          label="Semestre"
          value={semestreFilter}
          onChange={setSemestreFilter}
          options={SEMESTRE_OPTIONS.map((s) => ({ value: s, label: s }))}
          minWidth={140}
        />
        <FilterSelect
          label="Orientador"
          value={orientadorFilter}
          onChange={setOrientadorFilter}
          options={orientadorOptions}
          minWidth={200}
        />
        <FilterSelect
          label="Curso"
          value={cursoFilter}
          onChange={setCursoFilter}
          options={cursoOptions}
          minWidth={200}
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
                <TableCell>Título</TableCell>
                <TableCell>Aluno</TableCell>
                <TableCell>Orientador</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Semestre</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Arquivo</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((t) => {
                const fileUrl = mediaUrl(t.arquivo);
                return (
                  <TableRow key={t.id} hover>
                    <TableCell>{t.titulo}</TableCell>
                    <TableCell>{alunosMap.get(t.aluno)?.nome ?? '—'}</TableCell>
                    <TableCell>{profMap.get(t.orientador)?.nome ?? '—'}</TableCell>
                    <TableCell>{t.tipo_display}</TableCell>
                    <TableCell>{t.semestre_letivo_defesa ?? '—'}</TableCell>
                    <TableCell>
                      <Select
                        size="small"
                        value={t.status}
                        onChange={(e) =>
                          handleStatusChange(t, e.target.value as TccStatus)
                        }
                        renderValue={(value) => (
                          <Chip
                            size="small"
                            label={
                              STATUS_OPTIONS.find((s) => s.value === value)?.label
                            }
                            color={STATUS_COLOR[value as TccStatus]}
                          />
                        )}
                        sx={{ minWidth: 150 }}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <MenuItem key={s.value} value={s.value}>
                            {s.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell align="center">
                      {fileUrl ? (
                        <Tooltip title="Abrir PDF">
                          <Link href={fileUrl} target="_blank" rel="noopener">
                            <IconButton color="primary" size="small">
                              <DownloadIcon />
                            </IconButton>
                          </Link>
                        </Tooltip>
                      ) : (
                        '—'
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Editar">
                        <IconButton
                          size="small"
                          onClick={() => navigate(`/tccs/${t.id}/editar`)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Excluir">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => setToDelete(t)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    Nenhum TCC encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <ConfirmDialog
        open={!!toDelete}
        title="Excluir TCC"
        message={`Tem certeza que deseja excluir "${toDelete?.titulo}"?`}
        onConfirm={handleDelete}
        onCancel={() => setToDelete(null)}
      />
    </Box>
  );
}
