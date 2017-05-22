
```
# Clone the .vmdk image to a .vdi.
vboxmanage clonehd "C:\Users\Viet NT\.docker\machine\machines\default\disk.vmdk" "C:\Users\Viet NT\.docker\machine\machines\default\new-disk.vdi" --format vdi

# Resize the new .vdi image (61440 == 60 GB).
vboxmanage modifyhd "C:\Users\Viet NT\.docker\machine\machines\default\new-disk.vdi" --resize 61440

# Optional; switch back to a .vmdk.
vboxmanage clonehd "C:\Users\Viet NT\.docker\machine\machines\default\new-disk.vdi" "C:\Users\Viet NT\.docker\machine\machines\default\resized.vmdk" --format vmdk
```


## Ref:
https://www.jeffgeerling.com/blogs/jeff-geerling/resizing-virtualbox-disk-image
