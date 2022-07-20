import { Combobox } from "@headlessui/react";
import { useState } from "react";
import classNames from "classnames";
import { Client } from "../../../../types/client";
import { ReactComponent as ChevronDownIcon } from "../../../../assets/icons/chevronDownIcon.svg";
import { formatPrice } from "../../../../utils/formatPrice";
import styles from "./ClientSelect.module.scss";

type ClientSelectProps = {
  selectedClient?: Client;
  setSelectedClientId: (newClientId: string) => void;
  clients: Client[];
};

export const ClientSelect = ({
  selectedClient,
  setSelectedClientId,
  clients,
}: ClientSelectProps) => {
  const [query, setQuery] = useState("");

  return (
    <Combobox
      value={selectedClient}
      onChange={(client: Client) => setSelectedClientId(client?.id)}
    >
      <div className={styles.inputContainer}>
        <Combobox.Input
          className={styles.clientSelectInput}
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(client: Client) => client?.email}
          autoComplete="off"
          placeholder="Sélectionnez un client"
        />
        <Combobox.Button className={styles.clientSelectButton}>
          <ChevronDownIcon />
        </Combobox.Button>
        <Combobox.Options className={styles.clientOptionsContainer}>
          {clients
            .filter((client) => client.email.includes(query))
            .map((client) => (
              <Combobox.Option
                as="div"
                key={client.id}
                value={client}
                className={({ active }) =>
                  classNames(styles.clientOption, {
                    [styles.activeClientOption]: active,
                    [styles.inactiveClientOption]: !active,
                  })
                }
              >
                {client.email} - {formatPrice(client.credit)}
              </Combobox.Option>
            ))}
        </Combobox.Options>
      </div>
    </Combobox>
  );
};
