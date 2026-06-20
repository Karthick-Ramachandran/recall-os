# Threat Model

## Status

Draft — replace the prompts below with this repository's real analysis as it grows. `recall doctor`
flags these as warnings once the repository has real work (a feature, module, or accepted decision).

## Assets

Describe what this repository must protect: user data, credentials, money, availability, or
reputation.

## Entry Points

Describe where untrusted input enters: HTTP endpoints, webhooks, file uploads, queues, CLI input, or
third-party callbacks.

## Trust Boundaries

Describe where trust changes: client to server, service to database, your code to third-party APIs.

## Threats

Describe the concrete threats that apply to this repository, by category:

- Spoofing — how identities are faked or sessions stolen.
- Tampering — how requests, data, or builds are altered (injection, mass assignment).
- Repudiation — actions that must remain auditable.
- Information disclosure — how sensitive data or secrets could leak.
- Denial of service — how the system can be overwhelmed or abused.
- Elevation of privilege — how a user could gain access they should not have.

## Mitigations

Describe the control in place or planned for each threat above.

## Open Risks

Describe accepted or unresolved risks and who owns them.
