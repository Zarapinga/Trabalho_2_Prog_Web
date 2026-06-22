import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import PageHeader from '../components/PageHeader';
import ChartCard from '../components/ChartCard';
import { tccsApi } from '../api/endpoints';
import type { Estatisticas } from '../types/models';
import { toChartData } from '../utils/format';
import { CHART_COLORS } from '../theme';

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <Paper sx={{ p: 2.5 }}>
      <Typography variant="overline" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        {value}
      </Typography>
    </Paper>
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Estatisticas | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    tccsApi
      .estatisticas()
      .then((data) => {
        setStats(data);
        setError(null);
      })
      .catch(() => setError('Erro ao carregar estatísticas. O backend está rodando?'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !stats) {
    return (
      <Box>
        <PageHeader title="Dashboard" />
        <Alert severity="error">{error ?? 'Sem dados.'}</Alert>
      </Box>
    );
  }

  const statusData = toChartData(stats.por_status);
  const tipoData = toChartData(stats.por_tipo);
  const idiomaData = toChartData(stats.por_idioma);
  const orientadorData = toChartData(stats.por_orientador);
  const cursoData = toChartData(stats.por_curso);
  const departamentoData = toChartData(stats.por_departamento);
  const semestreData = toChartData(stats.por_semestre);

  return (
    <Box>
      <PageHeader title="Dashboard" />

      <Grid container spacing={2} sx={{ mb: 1 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Total de TCCs" value={stats.total_geral} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Orientadores" value={orientadorData.length} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Cursos com TCC" value={cursoData.length} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            label="Aprovados"
            value={stats.por_status['Aprovado'] ?? 0}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ChartCard title="TCCs por Status">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  label
                >
                  {statusData.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ChartCard title="TCCs por Tipo">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={tipoData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  label
                >
                  {tipoData.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ChartCard title="TCCs por Orientador">
            <ResponsiveContainer>
              <BarChart data={orientadorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" hide />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill={CHART_COLORS[0]} name="TCCs" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ChartCard title="TCCs por Curso">
            <ResponsiveContainer>
              <BarChart data={cursoData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" hide />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill={CHART_COLORS[1]} name="TCCs" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ChartCard title="TCCs por Departamento">
            <ResponsiveContainer>
              <BarChart data={departamentoData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" hide />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill={CHART_COLORS[2]} name="TCCs" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ChartCard title="TCCs por Semestre de Defesa">
            <ResponsiveContainer>
              <BarChart data={semestreData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill={CHART_COLORS[3]} name="TCCs" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ChartCard title="TCCs por Idioma">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={idiomaData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  label
                >
                  {idiomaData.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>
    </Box>
  );
}
