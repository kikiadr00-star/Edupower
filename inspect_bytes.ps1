$filePath = "d:\Gawian\projek antigravity\Edupower\index.html"
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

# Find "Butuh" and show chars before it
$idx = $content.IndexOf("Butuh Perbaikan")
if ($idx -ge 0) {
    $start = [Math]::Max(0, $idx - 15)
    $before = $content.Substring($start, $idx - $start)
    Write-Host "=== Before 'Butuh Perbaikan' ==="
    Write-Host "String: [$before]"
    foreach ($c in $before.ToCharArray()) {
        Write-Host "  Char: U+$([int]$c | ForEach-Object { $_.ToString('X4') }) = '$c'"
    }
}

# Find "Ubah Detail" and show chars before it
$idx2 = $content.IndexOf("Ubah Detail")
if ($idx2 -ge 0) {
    $start2 = [Math]::Max(0, $idx2 - 15)
    $before2 = $content.Substring($start2, $idx2 - $start2)
    Write-Host "`n=== Before 'Ubah Detail' ==="
    Write-Host "String: [$before2]"
    foreach ($c in $before2.ToCharArray()) {
        Write-Host "  Char: U+$([int]$c | ForEach-Object { $_.ToString('X4') }) = '$c'"
    }
}

# Find "Tambah Soal Baru" 
$idx3 = $content.IndexOf("Tambah Soal Baru")
if ($idx3 -ge 0) {
    $start3 = [Math]::Max(0, $idx3 - 15)
    $before3 = $content.Substring($start3, $idx3 - $start3)
    Write-Host "`n=== Before 'Tambah Soal Baru' ==="
    Write-Host "String: [$before3]"
    foreach ($c in $before3.ToCharArray()) {
        Write-Host "  Char: U+$([int]$c | ForEach-Object { $_.ToString('X4') }) = '$c'"
    }
}
