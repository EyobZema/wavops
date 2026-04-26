# Copy this module into your WavOps Ingest project (C:/WavOps Ingest) and call from your pipeline.
# Each analysis run should write: C:/WavOps Ingest/results/{dataset_name}.json
# Set WAVOPS_INGEST_RESULTS to override the results directory.

from __future__ import annotations

import json
import os
import subprocess
from pathlib import Path

_default_results = Path("C:/WavOps Ingest/results")
RESULTS_ROOT = Path(os.environ.get("WAVOPS_INGEST_RESULTS", str(_default_results)))


def write_dataset_result(dataset_name: str, data: object) -> Path:
    """Write a single JSON file named {dataset_name}.json (safe for filesystem)."""
    safe = "".join(c if c.isalnum() or c in "._-" else "_" for c in dataset_name) or "dataset"
    RESULTS_ROOT.mkdir(parents=True, exist_ok=True)
    out = RESULTS_ROOT / f"{safe}.json"
    out.write_text(json.dumps(data, indent=2), encoding="utf-8")
    return out


def run_wavops_sync() -> None:
    """Optional: after analysis, copy JSON into the Next.js app (C:/WavOps/public/data)."""
    wavops = os.environ.get("WAVOPS_ROOT", "C:/WavOps")
    script = Path(wavops) / "scripts" / "sync.js"
    if not script.is_file():
        return
    subprocess.run(
        ["node", str(script)],
        cwd=wavops,
        check=False,
    )


# Example (integrate in your main analysis entrypoint):
# if __name__ == "__main__":
#     write_dataset_result("demo_dataset", {"summary": "ok", "items": []})
#     run_wavops_sync()
