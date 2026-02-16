import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getProductByIdAction } from "../actions/get-product-by-id.action"
import type { Product } from "@/interfaces/product.interface";
import { createUpdateProductAction } from "../actions/create-update-product.action";

export const useProduct = (id: string) => {

    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['product', { id }],
        queryFn: () => getProductByIdAction(id),
        retry: false,
        staleTime: 1000 * 60 * 5, // 5 minutos
        //enabled: !!id// hasta que tengamos un id no se dispara la peticion

    });

    const mutation = useMutation({
        mutationFn: createUpdateProductAction,
        onSuccess: (product: Product) => {
            //se invalida cache para que se muestren los datos nuevos
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: ['product', { id: product.id }] });

            //actualizar querydata
            queryClient.setQueryData(['product', { id: product.id }], product);

        },
    });

    //const handleSubmitForm = async (productLike: Partial<Product>) => {

    return {
        ...query,
        mutation,
    }
}

