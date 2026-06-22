# Acceptance Criteria: Drift Detection MVP

Acceptance criteria are behavior-level and testable.

Illustrative ADR identifiers below use non-numeric placeholders (`ADR-XXXX`) so this document does
not itself reference decisions that do not exist. Concrete numeric cases are exercised in the tests.

## Dangling ADR reference

- Given a feature doc that references a missing identifier (for example `ADR-XXXX`) and no matching
  ADR file exists, Doctor reports an error with check `drift-adr-reference` and the referencing doc
  path.
- Given a module doc that references a missing identifier and no matching ADR file exists, Doctor
  reports an error with check `drift-adr-reference` and the referencing doc path.
- The dangling-reference error maps to Doctor exit code `2`.

## Proposed ADR reference

- Given a feature doc that references an identifier whose ADR file status is `Proposed`, Doctor
  reports a warning with check `drift-proposed-reference`.
- The proposed-reference warning maps to Doctor exit code `1` when no errors exist.

## Accepted ADR reference

- Given a feature or module doc that references an identifier whose ADR file status is `Accepted`,
  Doctor reports no drift finding for that reference.

## Determinism and safety

- Drift findings depend only on repository files, not on time, environment, or network.
- A reference is reported at most once per referencing document and ADR identifier.
- Doctor does not modify any file while running drift checks.
- A healthy `persist init` repository produces no drift findings.

## Regression safety

- Existing config, required-files, memory-integrity, and standards checks keep their behavior.
- The full existing test suite continues to pass.
