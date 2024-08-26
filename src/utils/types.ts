export const identifyStructure = (
  data: string[]
): "anexo" | "completo" | "unknown" => {
  const firstLine = data[0];

  const isAnexo =
    firstLine.includes("EL ONCE S.A.") && firstLine.includes("Fecha:");

  const isCompleto =
    firstLine.includes("$ S/IVA") && firstLine.includes("Empaque");

  if (isAnexo) return "anexo";
  if (isCompleto) return "completo";

  return "unknown";
};
