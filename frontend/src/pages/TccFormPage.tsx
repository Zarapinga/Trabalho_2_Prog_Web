import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SaveIcon from '@mui/icons-material/Save';
import PageHeader from '../components/PageHeader';
import { alunosApi, professoresApi, tccsApi } from '../api/endpoints';
import type { Aluno, Professor, TccPayload } from '../types/models';
import {
  IDIOMA_OPTIONS,
  SEMESTRE_OPTIONS,
  STATUS_OPTIONS,
  TIPO_OPTIONS,
} from '../types/models';

const EMPTY: TccPayload = {
  titulo: '',
  resumo: '',
  palavras_chave: '',
  tipo: '',
  idioma: '',
  aluno: '',
  orientador: '',
  coorientador: '',
  presidente: '',
  primeiro_membro: '',
  segundo_membro: '',
  semestre_letivo_defesa: '',
  status: '0',
  arquivo: null,
};

export default function TccFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState<TccPayload>(EMPTY);
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [fileName, setFileName] = useState<string>('');
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carrega selects de apoio.
  useEffect(() => {
    alunosApi.list().then(setAlunos).catch(() => {});
    professoresApi.list().then(setProfessores).catch(() => {});
  }, []);

  // Em modo edição, carrega o TCC e preenche o formulário.
  useEffect(() => {
    if (!isEdit) return;
    tccsApi
      .get(Number(id))
      .then((t) => {
        setForm({
          titulo: t.titulo,
          resumo: t.resumo,
          palavras_chave: t.palavras_chave,
          tipo: t.tipo,
          idioma: t.idioma,
          aluno: t.aluno,
          orientador: t.orientador,
          coorientador: t.coorientador ?? '',
          presidente: t.presidente,
          primeiro_membro: t.primeiro_membro,
          segundo_membro: t.segundo_membro,
          semestre_letivo_defesa: t.semestre_letivo_defesa ?? '',
          status: t.status,
          arquivo: null,
        });
      })
      .catch(() => setError('Erro ao carregar o TCC.'))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  function setField<K extends keyof TccPayload>(key: K, value: TccPayload[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    // Validação básica dos obrigatórios.
    const required: (keyof TccPayload)[] = [
      'titulo', 'resumo', 'palavras_chave', 'tipo', 'idioma',
      'aluno', 'orientador', 'presidente', 'primeiro_membro', 'segundo_membro',
    ];
    for (const key of required) {
      if (form[key] === '' || form[key] === null) {
        setError('Preencha todos os campos obrigatórios (*).');
        return;
      }
    }

    setSaving(true);
    try {
      if (isEdit) {
        await tccsApi.update(Number(id), form);
      } else {
        await tccsApi.create(form);
      }
      navigate('/tccs');
    } catch {
      setError('Erro ao salvar o TCC. Verifique os campos e tente novamente.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Opções de professores reutilizadas nos vários selects de banca.
  const profMenu = professores.map((p) => (
    <MenuItem key={p.id} value={p.id}>
      {p.nome}
    </MenuItem>
  ));

  return (
    <Box>
      <PageHeader title={isEdit ? 'Editar TCC' : 'Novo TCC'} />

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Paper sx={{ p: 3 }} component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              label="Título *"
              fullWidth
              value={form.titulo}
              onChange={(e) => setField('titulo', e.target.value)}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              label="Resumo *"
              fullWidth
              multiline
              minRows={3}
              value={form.resumo}
              onChange={(e) => setField('resumo', e.target.value)}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              label="Palavras-chave *"
              fullWidth
              value={form.palavras_chave}
              onChange={(e) => setField('palavras_chave', e.target.value)}
              helperText="Separe por vírgulas"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              label="Tipo *"
              fullWidth
              value={form.tipo}
              onChange={(e) => setField('tipo', e.target.value as TccPayload['tipo'])}
            >
              {TIPO_OPTIONS.map((o) => (
                <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              label="Idioma *"
              fullWidth
              value={form.idioma}
              onChange={(e) => setField('idioma', e.target.value as TccPayload['idioma'])}
            >
              {IDIOMA_OPTIONS.map((o) => (
                <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              label="Aluno *"
              fullWidth
              value={form.aluno}
              onChange={(e) => setField('aluno', Number(e.target.value))}
            >
              {alunos.map((a) => (
                <MenuItem key={a.id} value={a.id}>
                  {a.nome} ({a.matricula})
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              label="Semestre de Defesa"
              fullWidth
              value={form.semestre_letivo_defesa}
              onChange={(e) => setField('semestre_letivo_defesa', e.target.value)}
            >
              <MenuItem value="">—</MenuItem>
              {SEMESTRE_OPTIONS.map((s) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={12}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
              Orientação
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              label="Orientador *"
              fullWidth
              value={form.orientador}
              onChange={(e) => setField('orientador', Number(e.target.value))}
            >
              {profMenu}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              label="Coorientador"
              fullWidth
              value={form.coorientador}
              onChange={(e) =>
                setField(
                  'coorientador',
                  e.target.value === '' ? '' : Number(e.target.value),
                )
              }
            >
              <MenuItem value="">—</MenuItem>
              {profMenu}
            </TextField>
          </Grid>

          <Grid size={12}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
              Banca
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              select
              label="Presidente *"
              fullWidth
              value={form.presidente}
              onChange={(e) => setField('presidente', Number(e.target.value))}
            >
              {profMenu}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              select
              label="1º Membro *"
              fullWidth
              value={form.primeiro_membro}
              onChange={(e) => setField('primeiro_membro', Number(e.target.value))}
            >
              {profMenu}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              select
              label="2º Membro *"
              fullWidth
              value={form.segundo_membro}
              onChange={(e) => setField('segundo_membro', Number(e.target.value))}
            >
              {profMenu}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              label="Status"
              fullWidth
              value={form.status}
              onChange={(e) => setField('status', e.target.value as TccPayload['status'])}
            >
              {STATUS_OPTIONS.map((o) => (
                <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<UploadFileIcon />}
              sx={{ height: 56 }}
              fullWidth
            >
              {fileName || 'Anexar PDF'}
              <input
                type="file"
                hidden
                accept="application/pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  setField('arquivo', file);
                  setFileName(file?.name ?? '');
                }}
              />
            </Button>
            {isEdit && (
              <Chip
                size="small"
                label="Deixe vazio para manter o arquivo atual"
                sx={{ mt: 1 }}
              />
            )}
          </Grid>
        </Grid>

        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveIcon />}
            disabled={saving}
          >
            {saving ? 'Salvando...' : 'Salvar'}
          </Button>
          <Button variant="text" onClick={() => navigate('/tccs')}>
            Cancelar
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
