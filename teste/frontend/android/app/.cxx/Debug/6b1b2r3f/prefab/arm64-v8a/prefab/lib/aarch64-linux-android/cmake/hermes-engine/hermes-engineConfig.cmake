if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "C:/Users/gusta/.gradle/caches/8.13/transforms/60e1701818cb0bc3ebe32fbc38c33d8a/transformed/hermes-android-0.79.4-debug/prefab/modules/libhermes/libs/android.arm64-v8a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/Users/gusta/.gradle/caches/8.13/transforms/60e1701818cb0bc3ebe32fbc38c33d8a/transformed/hermes-android-0.79.4-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

