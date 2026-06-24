import type { ReactNode } from "react";
import { Box, Typography } from "@mui/material";

/**
 * Props para o componente PageHeader
 * @interface Props
 * @property {string} title - Título da página
 * @property {ReactNode} [action] - Elemento de ação (ex: botão) no lado direito
 */
interface Props {
  title: string;
  action?: ReactNode;
}

/**
 * Componente de cabeçalho da página
 * Exibe título e ação opcionalmente alinhados
 * @component
 * @example
 * return (
 *   <PageHeader
 *     title="Meus TCCs"
 *     action={<Button variant="contained">Novo TCC</Button>}
 *   />
 * )
 */
export default function PageHeader({ title, action }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 2,
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      <Typography variant="h5">{title}</Typography>
      {action}
    </Box>
  );
}
