@echo off
"C:\\Program Files\\Amazon Corretto\\jdk17.0.16_8\\bin\\java" ^
  --class-path ^
  "C:\\Users\\gusta\\.gradle\\caches\\modules-2\\files-2.1\\com.google.prefab\\cli\\2.1.0\\aa32fec809c44fa531f01dcfb739b5b3304d3050\\cli-2.1.0-all.jar" ^
  com.google.prefab.cli.AppKt ^
  --build-system ^
  cmake ^
  --platform ^
  android ^
  --abi ^
  arm64-v8a ^
  --os-version ^
  24 ^
  --stl ^
  c++_shared ^
  --ndk-version ^
  27 ^
  --output ^
  "C:\\Users\\gusta\\AppData\\Local\\Temp\\agp-prefab-staging1083684440549739832\\staged-cli-output" ^
  "C:\\Users\\gusta\\.gradle\\caches\\8.13\\transforms\\7ed22a0039ae602719136455601f8f0f\\transformed\\react-android-0.79.4-debug\\prefab" ^
  "C:\\Users\\gusta\\.gradle\\caches\\8.13\\transforms\\60e1701818cb0bc3ebe32fbc38c33d8a\\transformed\\hermes-android-0.79.4-debug\\prefab" ^
  "C:\\Users\\gusta\\.gradle\\caches\\8.13\\transforms\\9f1a14ade7cb4bc06475ad48c27e26fd\\transformed\\fbjni-0.7.0\\prefab"
