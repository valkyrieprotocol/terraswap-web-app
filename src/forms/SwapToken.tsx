import React from "react"
import { gt } from "../libs/math"
import { format, lookupSymbol } from "../libs/parse"
import styles from "./SwapToken.module.scss"
import { GetTokenSvg } from "../helpers/token"
import { truncate } from "libs/text"

interface Props extends AssetItem {
  contract_addr?: string
  formatTokenName?: (symbol: string) => string
}

const SwapToken = ({
  symbol,
  balance,
  contract_addr,
  formatTokenName,
}: Props) => {
  const symbols = symbol.split("-")
  return (
    <article className={styles.asset}>
      <header className={styles.header}>
        <div className={styles.symbol_name}>
          <div className={styles.symbol}>
            <div className={styles.logo}>
              <img
                src={GetTokenSvg(symbols[0])}
                width={25}
                height={25}
                alt=""
              />
            </div>
            <div className={styles.name}>
              {formatTokenName?.(symbols[0]) ?? lookupSymbol(symbols[0])}
            </div>
            {symbols.length > 1 ? (
              <div className={styles.divide}>
                <span>-</span>
              </div>
            ) : undefined}
            {symbols.length > 1 ? (
              <div className={styles.logo}>
                <img
                  src={GetTokenSvg(symbols[1])}
                  width={25}
                  height={25}
                  alt=""
                />
              </div>
            ) : undefined}
            {symbols.length > 1 ? (
              <div className={styles.name}>
                {formatTokenName?.(symbols[1]) ?? lookupSymbol(symbols[1])}
              </div>
            ) : undefined}
          </div>
          <div className={styles.address}>
            <span className={styles["address--mobile"]}>
              {truncate(contract_addr, [0, 6])}
            </span>
            <span className={styles["address--desktop"]}>
              {truncate(contract_addr, [8, 8])}
            </span>
          </div>
        </div>
      </header>

      <footer className={styles.footer}>
        {balance && gt(balance, 0) && (
          <p className={styles.balance}>
            Balance: <strong>{format(balance, symbol)}</strong>
          </p>
        )}
      </footer>
    </article>
  )
}

export default SwapToken
