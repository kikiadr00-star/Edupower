$filePath = "d:\Gawian\projek antigravity\Edupower\index.html"
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

# Warning emoji mojibake: U+00E2 U+0161 U+00A0 U+00EF U+00B8 U+008F U+0020
$warn = "" + [char]0x00E2 + [char]0x0161 + [char]0x00A0 + [char]0x00EF + [char]0x00B8 + [char]0x008F + [char]0x0020
$content = $content.Replace($warn, "")

# Pencil emoji mojibake: U+00E2 U+0153 U+008F U+00EF U+00B8 U+008F U+0020
$pencil = "" + [char]0x00E2 + [char]0x0153 + [char]0x008F + [char]0x00EF + [char]0x00B8 + [char]0x008F + [char]0x0020
$content = $content.Replace($pencil, "")

# Plus emoji mojibake: U+00E2 U+017E U+2022 U+0020
$plus = "" + [char]0x00E2 + [char]0x017E + [char]0x2022 + [char]0x0020
$content = $content.Replace($plus, "")

# Write back as UTF-8 without BOM
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($filePath, $content, $utf8NoBom)

# Verify
$newContent = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)
$idx = $newContent.IndexOf("Butuh Perbaikan")
if ($idx -ge 0) {
    $before = $newContent.Substring([Math]::Max(0, $idx - 3), 3)
    Write-Host "Before 'Butuh': [$before]"
}
$idx2 = $newContent.IndexOf("Ubah Detail")
if ($idx2 -ge 0) {
    $before2 = $newContent.Substring([Math]::Max(0, $idx2 - 3), 3)
    Write-Host "Before 'Ubah': [$before2]"
}
Write-Host "Done! Size: $((Get-Item $filePath).Length) bytes"
