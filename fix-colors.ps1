$files = @(
    "app\pages\repository\[id].vue"
)

foreach ($file in $files) {
    $path = "c:\PersonalStorage\Programming\Projects\ImageHub\$file"
    if (Test-Path $path) {
        $content = Get-Content $path | Out-String
        $content = $content -replace 'bg-indigo-600 hover:bg-indigo-700', 'bg-[#611f69] hover:bg-[#4a154b]'
        $content = $content -replace 'bg-indigo-600', 'bg-[#611f69]'
        $content = $content -replace 'text-indigo-600 hover:text-indigo-700', 'text-[#611f69] hover:text-[#4a154b]'
        $content = $content -replace 'text-indigo-600', 'text-[#611f69]'
        $content = $content -replace 'focus:ring-indigo-500', 'focus:ring-[#611f69]'
        $content = $content -replace 'peer-focus:ring-indigo-300', 'peer-focus:ring-[#611f69]/30'
        $content | Set-Content $path -NoNewline
        Write-Host "Fixed: $file"
    }
}
